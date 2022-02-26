package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.constants.ValidateConstant;
import com.capstone_project.hbts.dto.ReviewDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.response.DataPagingResponse;
import com.capstone_project.hbts.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ReviewResource {

    private final ReviewService reviewService;

    public ReviewResource(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/reviews")
    public ApiResponse<?> getReview(@RequestParam int hotelId,
                                    @RequestParam(defaultValue = ValidateConstant.PAGE) int page,
                                    @RequestParam(defaultValue = ValidateConstant.PER_PAGE) int pageSize){
        try {
            Page<ReviewDTO> pageReview = reviewService.loadReview(hotelId, PageRequest.of(page,pageSize));

            DataPagingResponse<?> dataPagingResponse = new DataPagingResponse<>(pageReview.getContent(),
                    pageReview.getTotalElements(), page, pageReview.getSize());

            return new ApiResponse<>(200, dataPagingResponse, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }
}