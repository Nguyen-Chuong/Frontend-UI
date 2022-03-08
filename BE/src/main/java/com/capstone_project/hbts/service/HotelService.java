package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Hotel.HotelDTO;
import com.capstone_project.hbts.dto.Hotel.HotelDetailDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.sql.Date;
import java.util.List;

public interface HotelService {

    /**
     * @param districtId
     * @param dateIn
     * @param dateOut
     * @param numberOfPeople
     * @param numberOfRoom
     * @param pageable
     * @return
     */
    Page<HotelDTO> searchHotel(int districtId, Date dateIn, Date dateOut,
                               int numberOfPeople, int numberOfRoom, Pageable pageable);

    /**
     * @param status
     * @param pageable
     * @return
     */
    Page<HotelDTO> getAllHotels(int status, Pageable pageable);

    /**
     * @param hotelId
     * @return
     */
    HotelDetailDTO getDetailHotelById(int hotelId);

    /**
     * @param hotelId
     * @return
     */
    void banHotelByHotelId(int hotelId);

    /**
     * @param providerId
     * @return
     */
    void banHotelByProviderId(int providerId);

    /**
     * @param providerId
     * @return
     */
    List<HotelDTO> viewListHotelByProviderId(int providerId);

}
