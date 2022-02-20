package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.response.CustomPageImpl;
import com.capstone_project.hbts.dto.HotelDTO;
import com.capstone_project.hbts.entity.Hotel;
import com.capstone_project.hbts.entity.RoomType;
import com.capstone_project.hbts.repository.HotelRepository;
import com.capstone_project.hbts.service.HotelService;
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
public class HotelServicesImpl implements HotelService {

    private final HotelRepository hotelRepository;

    private final ModelMapper modelMapper;

    public HotelServicesImpl(HotelRepository hotelRepository, ModelMapper modelMapper) {
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
        // get all hotel in this district
        Page<Hotel> hotelPage = hotelRepository.searchHotelByDistrict(districtId, pageable);

        // call booking repo, date in, date out

        // convert page to list to process
        List<Hotel> hotelList = hotelPage.getContent();

        // get content() return a fixed length
        List<Hotel> result = new ArrayList<>();

        result.addAll(hotelList);

        // check roomType later, no need to get roomType DTO

        for(int i = result.size() - 1 ; i >= 0; i --){
            if(getTotalRoom(result.get(i).getListRoomType()) < numberOfRoom
                    || getTotalPeople(result.get(i).getListRoomType()) < numberOfPeople){
                //result.remove(result.get(i));
            }
        }

        // final result in hotelList
        List<HotelDTO> hotelDTOList = result.stream().map(
                item -> modelMapper.map(item, HotelDTO.class)).collect(Collectors.toList());

        return new CustomPageImpl<>(hotelDTOList);
    }

}
