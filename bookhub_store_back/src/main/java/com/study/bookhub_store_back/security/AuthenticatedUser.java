package com.study.bookhub_store_back.security;

public interface AuthenticatedUser {
    String getEmail();
    String getName();
}
