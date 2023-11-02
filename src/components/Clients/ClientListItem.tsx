import React, {useState} from "react";
import { FaEdit } from 'react-icons/fa';
import { Client } from "../../../types/client";


export default function ClientListItem({ client }: {client: Client}) {
    return (
    <li>
        <span className="mx-3">{client.clientName}</span>
        <span className="mx-3">{client.CUIT}</span>
        <span className="mx-3">{client.address}</span>
        <span className="mx-3">{client.condicionIVA}</span>
        <span className="mx-3 cursor-pointer inline-block"><FaEdit className="mx-3 cursor-pointer" /></span>
    </li>
    )
};
