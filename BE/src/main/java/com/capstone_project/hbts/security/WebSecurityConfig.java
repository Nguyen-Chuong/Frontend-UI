package com.capstone_project.hbts.security;

import com.capstone_project.hbts.security.jwt.JwtAuthenticationEntryPoint;
import com.capstone_project.hbts.security.jwt.JwtTokenBeforeFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        prePostEnabled = true, securedEnabled = true
)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    private final JwtTokenBeforeFilter jwtTokenBeforeFilter;

    private final CustomUserDetailsService customUserDetailsService;

    public WebSecurityConfig(JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtTokenBeforeFilter jwtTokenBeforeFilter, CustomUserDetailsService customUserDetailsService) {
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtTokenBeforeFilter = jwtTokenBeforeFilter;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        // Round password is 12
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // csrf attack
        http.csrf().disable()
                // dont authenticate this request
                .authorizeRequests().antMatchers("/authenticate", "/register").permitAll()
                // all other requests need to be authenticated
                .anyRequest().authenticated()
                .and().exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
                // use stateless session; session won't be used to
                // store user's state.
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // add filter (request need validated jwt to pass over the security)
        http.addFilterBefore(jwtTokenBeforeFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // configure AuthenticationManager so that it knows from where to load
        // user for matching credentials
        // Use BCryptPasswordEncoder
        super.configure(auth);
        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
    }

}
