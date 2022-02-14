package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmailRepository extends JpaRepository<Email, Long> {
    List<Email> findAllBySubject(String subject);
}
