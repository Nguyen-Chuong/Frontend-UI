package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {

    Users getUsersByUsername(String username);

    Users getUsersByEmail(String email);

}
