package com.study.bookhub_store_back.security;

import com.study.bookhub_store_back.entity.Customer;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Getter
public class CustomUserDetails implements UserDetails, AuthenticatedUser {
    private final Customer customer;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(Customer customer) {
        this.customer = customer;
        String role = "ROLE_" + customer.getRole().toUpperCase();
        this.authorities = Collections.singleton(new SimpleGrantedAuthority(role));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.customer.getPassword();
    }

    @Override
    public String getUsername() {
        return this.customer.getEmail();
    }

    public String getPhoneNumber() {
        return this.customer.getPhoneNumber();
    }

    public Long getCartId() {
        return this.customer.getCart().getCartId();
    }

    @Override
    public String getEmail() {
        return this.customer.getEmail();
    }

    @Override
    public String getName() {
        return "";
    }
}
