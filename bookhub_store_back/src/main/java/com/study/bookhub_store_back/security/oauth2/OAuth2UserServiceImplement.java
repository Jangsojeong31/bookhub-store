package com.study.bookhub_store_back.security.oauth2;

import com.study.bookhub_store_back.entity.Customer;
import com.study.bookhub_store_back.repository.CustomerRepository;
import com.study.bookhub_store_back.security.UserPrincipal;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImplement extends DefaultOAuth2UserService {

    private final CustomerRepository customerRepository;

    @Override
    public OAuth2User loadUser (OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(request);

        String provider = request.getClientRegistration().getClientName().toLowerCase();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String socialId = getSocialId(oAuth2User, provider);

        System.out.println("✅ Provider: " + provider);
        System.out.println("✅ SocialId: " + socialId);
        System.out.println("✅ Attributes: " + oAuth2User.getAttributes());

        Customer user = customerRepository.findBySocialIdAndSocialProvider(socialId, provider);

        if (user != null) {
            return UserPrincipal.create(user, attributes);
        } else {
        // provider별 attributes 파싱
            String email = null;
            String phoneNumber = null;
            String name = null;
            String nickname = null;
            String profileImage = null;

            switch (provider) {
                case "kakao" -> {
                    Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
                    Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

                    nickname = (String) profile.get("nickname");
                    profileImage = (String) profile.get("profile_image_url");
                    break;
                }

                case "naver" -> {
                    System.out.println("네이버 로그인 중...");
                    Map<String, Object> response = (Map<String, Object>) attributes.get("response");
                    nickname = (String) response.get("nickname");
                    profileImage = (String) response.get("profile_image");
                    email = (String) response.get("email");
                    phoneNumber = (String) response.get("mobile");
                    name = (String) response.get("name");
                    break;
                }

                case "google" -> {
                    System.out.println("구글 로그인 중...");
                    email = (String) attributes.get("email");
                    name = (String) attributes.get("name");
                    profileImage = (String) attributes.get("picture");
                    break;
                }
            }

            // 이메일 중복 체크
            Customer existingEmailUser = customerRepository.findByEmail(email);

            if (existingEmailUser != null) {
                return UserPrincipal.create(existingEmailUser, attributes, false, true);
            }

            Customer customer = Customer.builder()
                    .email(email)
                    .name(name)
                    .nickname(nickname)
                    .profileImageUrl(profileImage)
                    .phoneNumber(phoneNumber)
                    .role("ROLE_USER")
                    .socialProvider(provider)
                    .socialId(socialId)
                    .build();

            customerRepository.save(customer);

            return UserPrincipal.create(customer, attributes, true, false);

        }
    }

    private String getSocialId(OAuth2User oAuth2User, String provider) {
        if (provider.equals("kakao")) return oAuth2User.getName();
        if (provider.equals("naver"))
            return ((Map<String, String>) oAuth2User.getAttributes().get("response")).get("id");
        if (provider.equals("google")) return (String) oAuth2User.getAttributes().get("sub");
        return null;
    }

}
