'use client';

import React, { useState } from 'react';
import { residentService } from '@/lib/api';

const EditResident = () => {

    const [formData, setFormData] = useState<any>({
        Id: 1, // change dynamically if needed
        FirstName: '',
        LastName: '',
        Email: '',
        CNIC: '',
        Password: '',
        PrimaryNo: '',
        SecondaryNo: '',
        EmergencyContact: '',
        ResidentType: '',
        ProfileImage: '',
        Documents: [],

        Address: {
            IsDefault: true,
            HouseNo: '',
            Line: '',
            Street: '',
            Block: '',
            City: '',
            State: '',
            ZipCode: '',
            Country: '',
            Longitude: '',
            Latitude: ''
        }
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name.startsWith('Address.')) {
            const key = name.split('.')[1];

            setFormData((prev: any) => ({
                ...prev,
                Address: {
                    ...prev.Address,
                    [key]: value
                }
            }));
        } else {
            setFormData((prev: any) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            await residentService.update(formData.Id, {
                ...formData,
                Documents: formData.Documents || []
            });
            alert('Resident Updated Successfully ✅');

        } catch (error) {
            console.error(error);
            alert('Update Failed ❌');
        }
    };

    return (
        <div className="p-10 space-y-6">

            <h2 className="text-xl font-bold">Edit Resident</h2>

            <div className="grid grid-cols-2 gap-4">

                <input name="FirstName" placeholder="First Name" onChange={handleChange} />
                <input name="LastName" placeholder="Last Name" onChange={handleChange} />
                <input name="Email" placeholder="Email" onChange={handleChange} />
                <input name="CNIC" placeholder="CNIC" onChange={handleChange} />
                <input name="Password" placeholder="Password" onChange={handleChange} />
                <input name="PrimaryNo" placeholder="Primary No" onChange={handleChange} />
                <input name="SecondaryNo" placeholder="Secondary No" onChange={handleChange} />
                <input name="EmergencyContact" placeholder="Emergency Contact" onChange={handleChange} />

                <input name="ResidentType" placeholder="Resident Type" onChange={handleChange} />

                {/* Address */}
                <input name="Address.HouseNo" placeholder="House No" onChange={handleChange} />
                <input name="Address.Line" placeholder="Line" onChange={handleChange} />
                <input name="Address.Street" placeholder="Street" onChange={handleChange} />
                <input name="Address.Block" placeholder="Block" onChange={handleChange} />
                <input name="Address.City" placeholder="City" onChange={handleChange} />
                <input name="Address.State" placeholder="State" onChange={handleChange} />
                <input name="Address.ZipCode" placeholder="Zip Code" onChange={handleChange} />
                <input name="Address.Country" placeholder="Country" onChange={handleChange} />
                <input name="Address.Longitude" placeholder="Longitude" onChange={handleChange} />
                <input name="Address.Latitude" placeholder="Latitude" onChange={handleChange} />

            </div>

            <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
            >
                UPDATE RESIDENT
            </button>

        </div>
    );
};

export default EditResident;