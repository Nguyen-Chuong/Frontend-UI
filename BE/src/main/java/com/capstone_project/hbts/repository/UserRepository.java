package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {

    Users getUsersByUsername(String username);

    Users getUsersByEmail(String email);

    @Modifying
    @Query(value = "UPDATE capstone.users SET password = :newPass  WHERE capstone.users.username = :username",
            nativeQuery = true)
    void changePass(
            @Param("username") String username,
            @Param("newPass") String newPass);

    @Query(value = "SELECT password from capstone.users WHERE capstone.users.username = :username",
            nativeQuery = true)
    String getOldPassword(@Param("username") String username);

    @Modifying
    @Query(value = "UPDATE capstone.users SET firstname = :firstName, lastname = :lastName, phone = :phone, " +
            "address = :address, avatar = :avatar, spend = :spend WHERE capstone.users.id = :id",
            nativeQuery = true)
    void updateUserProfile(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("phone") String phone,
            @Param("address") String address,
            @Param("avatar") String avatar,
            @Param("spend") BigDecimal spend,
            @Param("id") Integer id);

}
