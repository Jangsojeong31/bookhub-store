package com.study.bookhub_store_back.security.jwt;

import com.study.bookhub_store_back.security.CustomUserDetails;
import com.study.bookhub_store_back.security.UserDetailsServiceImpl;
import com.study.bookhub_store_back.security.oauth2.CustomOAuth2User;
import com.study.bookhub_store_back.security.oauth2.OAuth2UserServiceImplement;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        try {
//            String requestURI = request.getRequestURI();
//
//            if (requestURI.startsWith("/v3/api-docs") ||
//                    requestURI.startsWith("/swagger-ui") ||
//                    requestURI.equals("/swagger-ui.html")) {
//                filterChain.doFilter(request, response);
//                return;
//            }

            String path = request.getRequestURI();
            if (path.startsWith("/files")) {
                filterChain.doFilter(request,response);
                return;
            }

            String authorizationHeader = request.getHeader("Authorization");

            String token = (authorizationHeader != null &&  authorizationHeader.startsWith("Bearer "))
                    ? jwtProvider.removeBearer(authorizationHeader)
                    : null;

            if (token == null || !jwtProvider.isValidToken(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                filterChain.doFilter(request, response);
                return;
            }

            String email = jwtProvider.getEmailFromJwt(token);
            CustomUserDetails userDetails = userDetailsService.loadUserByUsername(email);

            setAuthenticationContext(request, userDetails);
            System.out.println(SecurityContextHolder.getContext().getAuthentication());
        } catch (Exception e) {
            e.printStackTrace();
        }
        filterChain.doFilter(request, response);
    }

    private void setAuthenticationContext(HttpServletRequest request, CustomUserDetails userDetails) {
        AbstractAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authenticationToken);

        SecurityContextHolder.setContext(securityContext);
    }
}
