package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.Booking.BookingListDTO;
import com.capstone_project.hbts.dto.Booking.UserBookingDTO;
import com.capstone_project.hbts.entity.UserBooking;
import com.capstone_project.hbts.entity.UserBookingDetail;
import com.capstone_project.hbts.repository.BookingRepository;
import com.capstone_project.hbts.response.CustomPageImpl;
import com.capstone_project.hbts.service.BookingService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
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

    public BigDecimal countTotalPaidForABooking(UserBooking userBooking){
        // get list user booking detail
        Set<UserBookingDetail> userBookingDetails = userBooking.getListUserBookingDetail();

        BigDecimal totalPaid = BigDecimal.valueOf(0);

        for(UserBookingDetail item : userBookingDetails){
            totalPaid = totalPaid
                    .add(item.getPaid() // price for each room type
                            .multiply(BigDecimal.valueOf(item.getQuantity()))); // quantity
        }
        return totalPaid;
    }

    @Override
    public List<UserBookingDTO> getAllBookings(int userId) {
        log.info("Request to get all booking by user id");
        List<UserBooking> list = bookingRepository.findAllByUserId(userId);

        List<UserBookingDTO> userBookingDTOList = list.stream()
                .map(item -> modelMapper.map(item, UserBookingDTO.class))
                .collect(Collectors.toList());

        for(int i = 0 ; i < list.size(); i++){
            BigDecimal totalPaid = countTotalPaidForABooking(list.get(i));
            // set total paid for each user booking
            userBookingDTOList.get(i).setTotalPaid(totalPaid);
        }
        return userBookingDTOList;
    }

    @Override
    public List<UserBookingDTO> getAllBookingsReview(int reviewStatus, int userId) {
        log.info("Request to get all booking need to review or not by user id");
        List<UserBooking> list = bookingRepository.findBookingsReview(reviewStatus, userId);

        List<UserBookingDTO> userBookingDTOList = list.stream()
                .map(item -> modelMapper.map(item, UserBookingDTO.class))
                .collect(Collectors.toList());

        for(int i = 0 ; i < list.size(); i++){
            BigDecimal totalPaid = countTotalPaidForABooking(list.get(i));
            // set total paid for each user booking
            userBookingDTOList.get(i).setTotalPaid(totalPaid);
        }
        return userBookingDTOList;
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

        List<UserBookingDTO> userBookingDTOList = list.stream()
                .map(item -> modelMapper.map(item, UserBookingDTO.class))
                .collect(Collectors.toList());

        for(int i = 0 ; i < list.size(); i++){
            BigDecimal totalPaid = countTotalPaidForABooking(list.get(i));
            // set total paid for each user booking
            userBookingDTOList.get(i).setTotalPaid(totalPaid);
        }
        return userBookingDTOList;
    }

    @Override
    public Page<BookingListDTO> getAllBookingForAdmin(Pageable pageable) {
        log.info("Request to get all booking for admin paging");
        Page<UserBooking> userBookingPage = bookingRepository.findAllByOrderByBookingDateDesc(pageable);

        List<UserBooking> userBookingList = userBookingPage.getContent();

        List<BookingListDTO> listBookingDTOList = userBookingList.stream()
                .map(item -> modelMapper.map(item, BookingListDTO.class))
                .collect(Collectors.toList());

        for(int i = 0; i < listBookingDTOList.size(); i++){
            listBookingDTOList.get(i).setUsername(userBookingList.get(i).getUsers().getUsername());
        }

        return new CustomPageImpl<>(listBookingDTOList);
    }

}
