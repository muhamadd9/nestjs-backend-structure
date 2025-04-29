import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';

export const sendEmail = async (data: SendMailOptions) => {
  try {
    if (!data.to && !data.cc && !data.bcc) {
      throw new BadRequestException('missing email destination');
    }
    if (!data.html && !data.text && !data.attachments?.length) {
      throw new BadRequestException('missing email template');
    }
    const transporter: Transporter = createTransport({
      host: 'smtp.gmail.email',
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"test Email " <${process.env.EMAIL}>`,
      ...data,
    });
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
};
