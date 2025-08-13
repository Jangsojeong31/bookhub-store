package com.study.bookhub_store_back.security.oauth2;

import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Getter
public class CustomOAuth2User extends DefaultOAuth2User {
    private final String email;
    private final String password;
    private final String nickname;
    private final String profileImage;
    private final String socialId;
    private final String socialProvider;
    private final boolean existed;

    @Builder
    public CustomOAuth2User(String email, String password, String nickname, String profileImage, String socialId, String socialProvider
            , Map<String, Object> attributes, boolean existed) {
        super(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), attributes, "id");
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.socialId = socialId;
        this.socialProvider = socialProvider;
        this.existed = existed;
    }

    @Override
    public String getName() {
        return socialId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    public boolean isExisted() {
        return existed;
    }
}
