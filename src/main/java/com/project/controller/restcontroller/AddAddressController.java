package com.project.controller.restcontroller;

import com.project.model.AddressDTO;
import com.project.service.AddressService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AddAddressController {

    private AddressService addressService;

    @PostMapping("/enterAddress")
    public String addAddress(@RequestBody AddressDTO addressDTO) {
        addressService.addAddress(addressDTO);
        return null;
    }
}
