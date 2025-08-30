package com.study.bookhub_store_back.security;

import com.study.bookhub_store_back.entity.Customer;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Getter
public class UserPrincipal implements UserDetails, OAuth2User {
    private final Customer customer;
    private final Collection<? extends GrantedAuthority> authorities;
    private final Map<String, Object> oauthUserAttributes;
    private final boolean existingEmail;
    private final boolean isNewUser;

    public UserPrincipal(Customer customer, Map<String, Object> oauthUserAttributes, boolean isNewUser, boolean existingEmail) {
        this.customer = customer;
        String role = "ROLE_" + customer.getRole().toUpperCase();
        this.authorities = Collections.singleton(new SimpleGrantedAuthority(role));
        this.oauthUserAttributes = oauthUserAttributes;
        this.isNewUser = isNewUser;
        this.existingEmail = existingEmail;
    }

    public static UserPrincipal create(Customer customer){
        return new UserPrincipal(customer, new HashMap<>(), false, false);
    }

    public static UserPrincipal create(Customer customer, Map<String, Object> oauthUserAttributes) {
        return new UserPrincipal(customer, oauthUserAttributes, false, false);
    }

    public static UserPrincipal create(Customer customer, Map<String, Object> oauthUserAttributes, boolean isNewUser, boolean existingEmail) {
        return new UserPrincipal(customer, oauthUserAttributes, isNewUser, existingEmail);
    }


    @Override
    public String getName() {
        return customer.getEmail();
    }

    @Override
    public String getPassword() {
        return customer.getPassword();
    }

    @Override
    public String getUsername() {
        return customer.getEmail();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oauthUserAttributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getUserId() {
        return customer.getCustomerId();
    }

    public String getPhoneNumber() {
        return customer.getPhoneNumber();
    }

    public Long getCartId() {
        return customer.getCart().getCartId();
    }
}
