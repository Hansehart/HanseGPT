package group.artifact;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                return http
                                .authorizeHttpRequests((requests) -> requests
                                                .requestMatchers("/api/service/**").permitAll()
                                                .anyRequest().authenticated())

                                .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer
                                                .configurationSource(corsConfigurationSource()))

                                .csrf(req -> req.disable())

                                .build();
        }

        @Value("${FRONTEND_ADDRESS}")
        private String allowedOrigins;

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration corsConfiguration = new CorsConfiguration();
                corsConfiguration.setAllowedOrigins(List.of(allowedOrigins));
                corsConfiguration.setAllowedMethods(List.of("GET", "POST"));
                corsConfiguration.setAllowedHeaders(List.of("*"));
                corsConfiguration.setAllowCredentials(true);
                corsConfiguration.setMaxAge(3600L);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/api/service/**", corsConfiguration);
                return source;
        }
}
