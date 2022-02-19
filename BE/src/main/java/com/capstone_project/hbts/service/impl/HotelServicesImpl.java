package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.HotelDTO;
import com.capstone_project.hbts.entity.Hotel;
import com.capstone_project.hbts.repository.HotelRepository;
import com.capstone_project.hbts.service.HotelService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelServicesImpl implements HotelService {

    private final HotelRepository hotelRepository;

    private final ModelMapper modelMapper;

    public HotelServicesImpl(HotelRepository hotelRepository, ModelMapper modelMapper) {
        this.hotelRepository = hotelRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Page<HotelDTO> searchHotel(int districtId, Date dateIn, Date dateOut, int numberOfPeople, int numberOfRoom, Pageable pageable) {
        Page<Hotel> hotelPage = hotelRepository.searchHotelByDistrict(districtId, pageable);

        List<Hotel> hotelList = hotelPage.getContent();

        List<HotelDTO> hotelDTOList = hotelList.stream().map(
                item -> modelMapper.map(item, HotelDTO.class)).collect(Collectors.toList());

        return new PageImpl<>(hotelDTOList);
    }
}
