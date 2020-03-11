package com.project.util;

import com.project.model.BookDTO;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class VarBookDTO {
    private Class localeStringClass = BookDTO.class;
    private List<String> fields = new ArrayList<>();

    public VarBookDTO() {
        Arrays.stream(localeStringClass.getDeclaredFields())
                .filter(n -> !(n.getName().equals("coverImage")))

                .forEach(n -> fields.add(n.getName()));
    }

    public List<String> getFields() {
        return fields;
    }
}
