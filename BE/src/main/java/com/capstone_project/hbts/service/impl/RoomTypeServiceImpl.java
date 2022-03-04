package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.Benefit.RoomTypeBenefitDTO;
import com.capstone_project.hbts.dto.Facility.FacilityDTO;
import com.capstone_project.hbts.dto.ImageDTO;
import com.capstone_project.hbts.dto.Room.RoomDetailDTO;
import com.capstone_project.hbts.dto.Room.RoomTypeDTO;
import com.capstone_project.hbts.entity.RoomType;
import com.capstone_project.hbts.repository.FacilityRepository;
import com.capstone_project.hbts.repository.RoomFacilityRepository;
import com.capstone_project.hbts.repository.RoomTypeRepository;
import com.capstone_project.hbts.service.RoomTypeService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Log4j2
public class RoomTypeServiceImpl implements RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;

    private final ModelMapper modelMapper;

    private final RoomFacilityRepository roomFacilityRepository;

    private final FacilityRepository facilityRepository;

    public RoomTypeServiceImpl(RoomTypeRepository roomTypeRepository, ModelMapper modelMapper,
                               RoomFacilityRepository roomFacilityRepository,
                               FacilityRepository facilityRepository) {
        this.roomTypeRepository = roomTypeRepository;
        this.modelMapper = modelMapper;
        this.roomFacilityRepository = roomFacilityRepository;
        this.facilityRepository = facilityRepository;
    }

    @Override
    public void createRoomType(RoomType roomType) {
        log.info("Request to create room type");

        if(roomType != null){
            try {
                roomTypeRepository.save(roomType);
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        }
    }

    @Override
    public boolean updateRoomType(Integer roomTypeId) {
        log.info("Request to update room type");
        return false;
    }

    @Override
    public List<RoomTypeDTO> loadRoomTypeByHotelId(int hotelId) {
        log.info("Request to load room type by hotel id");

        List<RoomType> list = roomTypeRepository.findRoomTypeByHotelId(hotelId);
        return list.stream().map(
                item -> modelMapper.map(item, RoomTypeDTO.class)).collect(Collectors.toList());
    }

    @Override
    public void deleteRoomType(int id) {
        log.info("Request to delete room type");

    }

    @Override
    public RoomDetailDTO viewRoomDetail(int roomTypeId) {
        log.info("Request to view detail room type");
        // get room type by id
        RoomType roomType = roomTypeRepository.getById(roomTypeId);

        // get set image from this room type and transfer to DTO
        Set<ImageDTO> imageDTOSet = roomType.getListImage()
                .stream()
                .map(item -> modelMapper.map(item, ImageDTO.class))
                .collect(Collectors.toSet());

        // get set benefit from this room type and transfer to DTO
        Set<RoomTypeBenefitDTO> roomTypeBenefitDTOSet = roomType.getListBenefit()
                .stream()
                .map(item -> modelMapper.map(item, RoomTypeBenefitDTO.class))
                .collect(Collectors.toSet());

        // get list facility id from room facility
        List<Integer> listFacilityId = roomFacilityRepository.getAllFacilityIdByRoomTypeId(roomTypeId);

        // select all facility from facility table by list facility ids and convert to DTO
        List<FacilityDTO> facilityDTOList = facilityRepository.findAllById(listFacilityId)
                .stream()
                .map(item -> modelMapper.map(item, FacilityDTO.class))
                .collect(Collectors.toList());

        // convert to DTO
        return new RoomDetailDTO(roomType.getId(), roomType.getName(),
                imageDTOSet, facilityDTOList, roomTypeBenefitDTOSet);

    }

}
