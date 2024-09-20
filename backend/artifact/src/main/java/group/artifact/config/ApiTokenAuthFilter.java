package group.artifact.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

public class ApiTokenAuthFilter extends OncePerRequestFilter {

    private final String apiToken;

    public ApiTokenAuthFilter(String apiToken) {
        this.apiToken = apiToken;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String requestToken = request.getHeader("Authorization");

        if (requestToken != null && requestToken.startsWith("Bearer ")) {
            requestToken = requestToken.substring(7);
            if (apiToken.equals(requestToken)) {
                SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken("API", null, Collections.emptyList())
                );
            }
        }

        filterChain.doFilter(request, response);
    }
}
