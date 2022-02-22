package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.RoomTypeDTO;
import com.capstone_project.hbts.entity.RoomType;
import com.capstone_project.hbts.repository.RoomTypeRepository;
import com.capstone_project.hbts.service.RoomTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomTypeServiceImpl implements RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;

    private final ModelMapper modelMapper;

    public RoomTypeServiceImpl(RoomTypeRepository roomTypeRepository, ModelMapper modelMapper) {
        this.roomTypeRepository = roomTypeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void createRoomType(RoomType roomType) {
        if(roomType != null){
            try {
                roomTypeRepository.save(roomType);
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        }
    }

    @Override
    public List<RoomTypeDTO> loadRoomType(){
        List<RoomType> list = roomTypeRepository.findAll();
        return list.stream().map(
                item -> modelMapper.map(item, RoomTypeDTO.class)).collect(Collectors.toList());
    }

    @Override
    public boolean updateRoomType(Integer roomTypeId) {
        return false;
    }

    @Override
    public List<RoomTypeDTO> loadRoomTypeByHotelId(int hotelId) {
        List<RoomType> list = roomTypeRepository.findRoomTypeByHotelId(hotelId);
        return list.stream().map(
                item -> modelMapper.map(item, RoomTypeDTO.class)).collect(Collectors.toList());
    }

    @Override
    public void deleteRoomType(int id) {

    }
}
