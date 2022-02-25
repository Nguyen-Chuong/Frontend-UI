package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Integer> {

    @Query(value = "select username from capstone.provider where email = :email",
            nativeQuery = true)
    String getProviderUsernameByEmail(@Param("email") String email);

    Provider getProviderByUsername(String username);

}
