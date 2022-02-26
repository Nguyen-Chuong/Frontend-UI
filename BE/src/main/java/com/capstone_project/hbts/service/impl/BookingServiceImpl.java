package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.UserBookingDTO;
import com.capstone_project.hbts.entity.UserBooking;
import com.capstone_project.hbts.repository.BookingRepository;
import com.capstone_project.hbts.service.BookingService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    private final ModelMapper modelMapper;

    public BookingServiceImpl(BookingRepository bookingRepository, ModelMapper modelMapper) {
        this.bookingRepository = bookingRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<UserBookingDTO> getAllBookings(int userId) {
        List<UserBooking> list = bookingRepository.findAllByUserId(userId);

        return list.stream().map(
                item -> modelMapper.map(item, UserBookingDTO.class)
        ).collect(Collectors.toList());
    }

    @Override
    public List<UserBookingDTO> getAllBookingsReview(int reviewStatus, int userId) {
        List<UserBooking> list = bookingRepository.findBookingsReview(reviewStatus, userId);

        return list.stream().map(
                item -> modelMapper.map(item, UserBookingDTO.class)
        ).collect(Collectors.toList());
    }

    @Override
    public int getNumberBookingsCompleted(int userId) {
        return bookingRepository.numberBookingCompleted(userId);
    }
}
