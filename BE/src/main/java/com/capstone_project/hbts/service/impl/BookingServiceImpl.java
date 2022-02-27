package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.Booking.UserBookingDTO;
import com.capstone_project.hbts.entity.UserBooking;
import com.capstone_project.hbts.repository.BookingRepository;
import com.capstone_project.hbts.service.BookingService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    private final ModelMapper modelMapper;

    public BookingServiceImpl(BookingRepository bookingRepository, ModelMapper modelMapper) {
        this.bookingRepository = bookingRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<UserBookingDTO> getAllBookings(int userId) {
        log.info("Request to get all booking by user id");
        List<UserBooking> list = bookingRepository.findAllByUserId(userId);

        return list.stream()
                .map(item -> modelMapper.map(item, UserBookingDTO.class))
                .collect(Collectors.toList());

    }

    @Override
    public List<UserBookingDTO> getAllBookingsReview(int reviewStatus, int userId) {
        log.info("Request to get all booking need to review or not by user id");
        List<UserBooking> list = bookingRepository.findBookingsReview(reviewStatus, userId);

        return list.stream()
                .map(item -> modelMapper.map(item, UserBookingDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public int getNumberBookingsCompleted(int userId) {
        log.info("Request to get number booking completed by user id");
        return bookingRepository.numberBookingCompleted(userId);
    }

    @Override
    public List<UserBookingDTO> getAllBookingsByStatus(int status, int userId) {
        log.info("Request to get all booking by status");
        List<UserBooking> list = bookingRepository.findBookingsByStatus(status, userId);

        return list.stream()
                .map(item -> modelMapper.map(item, UserBookingDTO.class))
                .collect(Collectors.toList());
    }

}
