package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.ReviewDTO;
import com.capstone_project.hbts.entity.Review;
import com.capstone_project.hbts.entity.UserBooking;
import com.capstone_project.hbts.repository.BookingRepository;
import com.capstone_project.hbts.repository.ReviewRepository;
import com.capstone_project.hbts.response.CustomPageImpl;
import com.capstone_project.hbts.service.ReviewService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ReviewServiceImpl implements ReviewService {

    private final BookingRepository bookingRepository;

    private final ReviewRepository reviewRepository;

    private final ModelMapper modelMapper;

    public ReviewServiceImpl(BookingRepository bookingRepository, ReviewRepository reviewRepository, ModelMapper modelMapper) {
        this.bookingRepository = bookingRepository;
        this.reviewRepository = reviewRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Page<ReviewDTO> loadReview(int hotelId, Pageable pageable) {
        log.info("Request to get all review by hotel id");

        List<UserBooking> userBookingList = bookingRepository.findUserBookingByHotelId(hotelId);
        ArrayList<Integer> listBookingId = new ArrayList<>();
        userBookingList.forEach(item -> listBookingId.add(item.getId()));

        Page<Review> pageReview = reviewRepository.loadReviewByBookingId(listBookingId, pageable);
        List<Review> listReview = new ArrayList<>(pageReview.getContent());

        List<ReviewDTO> reviewDTOList = listReview.stream().map(
                item -> modelMapper.map(item, ReviewDTO.class)).collect(Collectors.toList());

        return new CustomPageImpl<>(reviewDTOList);
    }

}
