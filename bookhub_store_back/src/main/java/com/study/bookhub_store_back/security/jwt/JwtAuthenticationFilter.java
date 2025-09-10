package com.study.bookhub_store_back.security.jwt;

import com.study.bookhub_store_back.security.UserDetailsServiceImpl;
import com.study.bookhub_store_back.security.UserPrincipal;
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

            if (path.startsWith("/files") || path.startsWith("/api/v1/public")
        || path.startsWith("/oauth2") || path.startsWith("/login")
            ) {
                filterChain.doFilter(request,response);
                return;
            }

            String authorizationHeader = request.getHeader("Authorization");

            String token = (authorizationHeader != null &&  authorizationHeader.startsWith("Bearer "))
                    ? jwtProvider.removeBearer(authorizationHeader)
                    : null;

            System.out.println("authorizationHeader: " + authorizationHeader);
            System.out.println("token class: " + (token != null ? token.getClass() : "null"));
            System.out.println("token value: " + token);

            if (token == null || !jwtProvider.isValidToken(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write("{\"error\": \"Unauthorized\"}");
                System.out.println(response);
                return;
            }

            String email = jwtProvider.getEmailFromJwt(token);
            UserPrincipal userPrincipal = userDetailsService.loadUserByUsername(email);

            setAuthenticationContext(request, userPrincipal);
            System.out.println(SecurityContextHolder.getContext().getAuthentication());
        } catch (Exception e) {
            e.printStackTrace();
        }
        filterChain.doFilter(request, response);
    }

    private void setAuthenticationContext(HttpServletRequest request, UserPrincipal userPrincipal) {
        AbstractAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authenticationToken);

        SecurityContextHolder.setContext(securityContext);
    }
}
