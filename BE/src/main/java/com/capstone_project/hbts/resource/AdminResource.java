package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.constants.ValidateConstant;
import com.capstone_project.hbts.dto.Actor.UserDTO;
import com.capstone_project.hbts.request.ManagerRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.response.DataPagingResponse;
import com.capstone_project.hbts.service.AdminService;
import com.capstone_project.hbts.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@Log4j2
@RequestMapping("api/v1")
public class AdminResource {

    private final AdminService adminService;

    private final UserService userService;

    public AdminResource(AdminService adminService, UserService userService) {
        this.adminService = adminService;
        this.userService = userService;
    }

    /**
     * @param managerRequest
     * return
     * @apiNote only for admin
     */
    @PostMapping("/add-manager")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addManager(@RequestBody ManagerRequest managerRequest){
        log.info("REST request to add a new manager : {}", managerRequest);

        if(userService.isEmailExist(managerRequest.getEmail())){
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_USER_004, ErrorConstant.ERR_USER_004_LABEL));
        }
        if(userService.isUsernameExist("u-" + managerRequest.getUsername())){
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_USER_005, ErrorConstant.ERR_USER_005_LABEL));
        }
        try {
            // type 0 is normal user, 1 is manager and 2 admin, register is always user
            managerRequest.setType(1);
            // name prefix for user table
            managerRequest.setUsername("u-" + managerRequest.getUsername());
            adminService.addNewManager(managerRequest);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, null,
                            null, null));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param page
     * @param pageSize
     * return
     * @apiNote for admin/ manager
     */
    @GetMapping("/get-all-user")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<?> getAllUser(@RequestParam(defaultValue = ValidateConstant.PAGE) int page,
                                        @RequestParam(defaultValue = ValidateConstant.PER_PAGE) int pageSize){
        log.info("REST request to get all user for admin");

        try {
            Page<UserDTO> userDTOPage = adminService.getAllUser(PageRequest.of(page, pageSize));

            DataPagingResponse<?> dataPagingResponse = new DataPagingResponse<>(userDTOPage.getContent(),
                    userDTOPage.getTotalElements(), page, userDTOPage.getSize());

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, dataPagingResponse,
                            null, null));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * return
     * @apiNote only for admin
     */
    @GetMapping("/get-all-manager")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllManager(){
        log.info("REST request to get all manager for admin");

        try {
            List<UserDTO> userDTOList = adminService.getListManager();

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, userDTOList,
                            null, null));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param userId
     * return
     * @apiNote only for admin
     */
    @PatchMapping("/delete-manager/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteManager(@PathVariable int userId){
        log.info("REST request to delete manager for admin");

        try {
            adminService.deleteManager(userId);

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, null,
                            null, null));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
