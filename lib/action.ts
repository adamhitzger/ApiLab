"use server"

import { ContactType, contact_schema } from "./schemas";
import { ActionResponse } from "@/types";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer"

function smtp(){
  return nodemailer.createTransport({
        host: "smtp.seznam.cz",
        port: 587,
        secure: false,
        auth: {
         user: process.env.FROM_EMAIL!,
         pass: process.env.FROM_EMAIL_PASSWORD!,
        },              
        tls: {
         ciphers: "SSLv3"
        }
      });
}

function escapeHtml(s: string) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

export async function sendContact(
    prevState: ActionResponse<ContactType>,
    formData: FormData
  ): Promise<ActionResponse<ContactType>> {
    const revalidate = false;
    const transporter = smtp();
    try {
        const raw_data: ContactType = {
            fullname: formData.get("fullname") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            msg: formData.get("msg") as string,
        }

        const validate = contact_schema.safeParse(raw_data);

        if(!validate.success){
            return {
                success: false,
                submitted:true,
                message: "Některá pole jste nevyplnili dobře",
                errors: validate.error.flatten().fieldErrors,
                inputs: raw_data,
            }
        }

        const data = validate.data;

        const sendMail = await transporter.sendMail({
          from: process.env.FROM_EMAIL,
          to: "adam.hitzger@icloud.com",
          subject: "Nový kontakt",
          /*text: [
            `Jméno: ${data.fullname}`,
            `E-mail: ${data.email}`,
            `Telefon: ${data.phone}`,
            ``,
            `Zpráva:`,
            data.msg,
            ].join("\n"),*/
            html: `
                <p><strong>Jméno:</strong> ${escapeHtml(data.fullname)}</p>
                <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
                <p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>
                ${data.msg && `<p><strong>Zpráva:</strong><br>${escapeHtml(data.msg).replace(/\n/g, '<br/>')}</p>`}
            `,
        })

        if(!sendMail.accepted){
            return {
                success: false,
                submitted:true,
                message: "Nepodařilo se odeslat mail. Kontaktujte mě napřímo",
                inputs: raw_data,
            }
        }

        return {
            success: true,
            submitted:true,
            message: "Odesláno",
        }

    }catch(error){
        console.error("Eroor v serverové akci sendContact: ", error);
        return {
            submitted:true,
            success: false,
            message: "Nepovedlo se odeslat Vaše údaje",
        };
    }finally{
        if(revalidate){
            revalidatePath("/")
        }
    }
  }