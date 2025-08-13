package com.study.bookhub_store_back.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
    public class HelloController {

        @GetMapping("/hello")
        public String hello() {
            return "Hello, Spring Boot!";
        }

        @GetMapping("/user")
        public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
            return principal.getAttributes();
        }


        @GetMapping("/")
        public String home() {
            return "<a href='/oauth2/authorization/kakao'>카카오 로그인</a>";
        }

        @GetMapping("/login-success")
        public String success() {
            return "로그인 성공!";
        }


}

