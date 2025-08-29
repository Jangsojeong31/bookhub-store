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
            String email = "";
            String phoneNumber = "";
            String name = "";
            String nickname = "";
            String profileImage = "";

        if (provider.equals("kakao")) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

            nickname = (String) profile.get("nickname");
            profileImage = (String) profile.get("profile_image_url");
        }

        Customer customer = Customer.builder()
                .email(email)
                .name(name)
                .nickname(nickname)
                .profileImageUrl(profileImage)
                .phoneNumber(phoneNumber)
                .socialProvider(provider)
                .socialId(socialId)
                .build();

        customerRepository.save(customer);

        return UserPrincipal.create(customer, attributes, true);

        }
    }

    private String getSocialId(OAuth2User oAuth2User, String provider) {
        if (provider.equals("kakao")) return oAuth2User.getName();
        if (provider.equals("naver"))
            return ((Map<String, String>) oAuth2User.getAttributes().get("response")).get("id");
        return null;
    }

}
