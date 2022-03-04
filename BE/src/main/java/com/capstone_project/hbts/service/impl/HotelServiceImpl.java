package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.Hotel.HotelDetailDTO;
import com.capstone_project.hbts.response.CustomPageImpl;
import com.capstone_project.hbts.dto.Hotel.HotelDTO;
import com.capstone_project.hbts.entity.Hotel;
import com.capstone_project.hbts.entity.RoomType;
import com.capstone_project.hbts.repository.HotelRepository;
import com.capstone_project.hbts.service.HotelService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Log4j2
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;

    private final ModelMapper modelMapper;

    public HotelServiceImpl(HotelRepository hotelRepository, ModelMapper modelMapper) {
        this.hotelRepository = hotelRepository;
        this.modelMapper = modelMapper;
    }

    public int getTotalRoom(Set<RoomType> roomTypes){
        int totalRoom = 0;
        for(Iterator<RoomType> iterator = roomTypes.iterator(); iterator.hasNext();){
            RoomType roomType = iterator.next();
            totalRoom = totalRoom + roomType.getAvailableRooms();
        }
        return totalRoom;
    }

    public int getTotalPeople(Set<RoomType> roomTypes){
        int totalPeople = 0;
        for(Iterator<RoomType> iterator = roomTypes.iterator(); iterator.hasNext();){
            RoomType roomType = iterator.next();
            totalPeople = totalPeople + roomType.getNumberOfPeople();
        }
        return totalPeople;
    }

    @Override
    public Page<HotelDTO> searchHotel(int districtId, Date dateIn, Date dateOut, int numberOfPeople, int numberOfRoom, Pageable pageable) {
        log.info("Request to get all hotel by district and other info");

        // get all hotel in this district
        Page<Hotel> hotelPage = hotelRepository.searchHotelByDistrict(districtId, pageable);

        // call booking repo, date in, date out to check

        // convert page to list to process
        List<Hotel> result = new ArrayList<>(hotelPage.getContent());

        for(int i = result.size() - 1 ; i >= 0; i --){
            if(getTotalRoom(result.get(i).getListRoomType()) < numberOfRoom
                    || getTotalPeople(result.get(i).getListRoomType()) < numberOfPeople){
                result.remove(result.get(i));
            }
        }

        // final result in hotelList
        List<HotelDTO> hotelDTOList = result
                .stream()
                .map(item -> modelMapper.map(item, HotelDTO.class))
                .collect(Collectors.toList());

        return new CustomPageImpl<>(hotelDTOList);
    }

    @Override
    public Page<HotelDTO> getAllHotels(int status, Pageable pageable) {
        log.info("Request to get all hotel by status");
        List<HotelDTO> hotelDTOList;

        if(status == 0){
            hotelDTOList = hotelRepository.findAll()
                    .stream()
                    .map(item -> modelMapper.map(item, HotelDTO.class))
                    .collect(Collectors.toList());
        }else {
            hotelDTOList = hotelRepository.findAllByStatus(status)
                    .stream()
                    .map(item -> modelMapper.map(item, HotelDTO.class))
                    .collect(Collectors.toList());
        }

        return new CustomPageImpl<>(hotelDTOList);
    }

    @Override
    public HotelDetailDTO getDetailHotelById(int hotelId) {
        log.info("Request to get detail hotel by id");
        return modelMapper.map(hotelRepository.getHotelById(hotelId), HotelDetailDTO.class);
    }

}
