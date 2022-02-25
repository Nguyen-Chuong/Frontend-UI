package com.capstone_project.hbts.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.sql.Timestamp;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "Feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // type 0: complain, type 1: refund, type 2: other, v v
    @Column(name = "type")
    private int type;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Users sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private Users receiver;

    @Column(name = "message")
    private String message;

    @Column(name = "modify_date")
    private Timestamp modifyDate;

    @Column(name = "is_completed")
    private int isCompleted;

}
