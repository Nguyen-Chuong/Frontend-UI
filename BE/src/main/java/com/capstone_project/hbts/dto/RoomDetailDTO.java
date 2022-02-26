package com.capstone_project.hbts.dto;

import com.capstone_project.hbts.entity.Facility;
import com.capstone_project.hbts.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDetailDTO {

    private Integer id;

    private String name;

    private Set<Image> listImage;

    private List<Facility> listFacility;

}
