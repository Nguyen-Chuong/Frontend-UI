package com.capstone_project.hbts.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class DataPagingResponse<T> {

    private List<T> items;

    private long total;

    private int page;

    private int pageSize;

}
