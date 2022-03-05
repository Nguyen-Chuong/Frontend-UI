package com.capstone_project.hbts.dto.Report;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class FeedbackDTO {

    private Integer id;

    private int type;

    private String senderName;

    private String message;

    private Timestamp modifyDate;

    private int isProcessed;

}
