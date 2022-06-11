const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'hotmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

const invitataionHtmlTemplate = (title, meeting_link, meeting_desc) => {
	// 	const html = `
	//     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	// <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
	//  <head>
	//   <title>${title}</title><!--[if (mso 16)]>
	//     <style type="text/css">
	//     a {text-decoration: none;}
	//     </style>
	//     <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
	// <xml>
	//     <o:OfficeDocumentSettings>
	//     <o:AllowPNG></o:AllowPNG>
	//     <o:PixelsPerInch>96</o:PixelsPerInch>
	//     </o:OfficeDocumentSettings>
	// </xml>
	// <![endif]-->
	//   <style type="text/css">
	// #outlook a {
	// 	padding:0;
	// }
	// .es-button {
	// 	mso-style-priority:100!important;
	// 	text-decoration:none!important;
	// }
	// a[x-apple-data-detectors] {
	// 	color:inherit!important;
	// 	text-decoration:none!important;
	// 	font-size:inherit!important;
	// 	font-family:inherit!important;
	// 	font-weight:inherit!important;
	// 	line-height:inherit!important;
	// }
	// .es-desk-hidden {
	// 	display:none;
	// 	float:left;
	// 	overflow:hidden;
	// 	width:0;
	// 	max-height:0;
	// 	line-height:0;
	// 	mso-hide:all;
	// }
	// [data-ogsb] .es-button {
	// 	border-width:0!important;
	// 	padding:10px 30px 10px 30px!important;
	// }
	// @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
	// </style>
	//  </head>
	//  <body data-new-gr-c-s-loaded="14.1062.0" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
	//   <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
	// 			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
	// 				<v:fill type="tile" color="#fafafa"></v:fill>
	// 			</v:background>
	// 		<![endif]-->
	//    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
	//      <tr>
	//       <td valign="top" style="padding:0;Margin:0">
	//        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
	//          <tr>
	//           <td class="es-info-area" align="center" style="padding:0;Margin:0">
	//            <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF">
	//              <tr>
	//               <td align="left" style="padding:20px;Margin:0">
	//                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                  <tr>
	//                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
	//                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                      <tr>
	//                       <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;Margin-bottom:15px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View online version</a></p></td>
	//                      </tr>
	//                    </table></td>
	//                  </tr>
	//                </table></td>
	//              </tr>
	//            </table></td>
	//          </tr>
	//        </table>
	//        <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
	//          <tr>
	//           <td align="center" style="padding:0;Margin:0">
	//            <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
	//              <tr>
	//               <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
	//                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                  <tr>
	//                   <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
	//                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                      <tr>
	//                       <td align="center" style="padding:0;Margin:0;padding-bottom:20px;font-size:0px"><img src="https://wiqyzf.stripocdn.email/content/guids/CABINET_887f48b6a2f22ad4fb67bc2a58c0956b/images/93351617889024778.png" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px" width="200" title="Logo"></td>
	//                      </tr>
	//                    </table></td>
	//                  </tr>
	//                </table></td>
	//              </tr>
	//            </table></td>
	//          </tr>
	//        </table>
	//        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
	//          <tr>
	//           <td align="center" style="padding:0;Margin:0">
	//            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
	//              <tr>
	//               <td align="left" style="Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:30px">
	//                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                  <tr>
	//                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
	//                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                      <tr>
	//                       <td align="left" class="es-m-txt-l" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333"><b>RCM Test</b></h1></td>
	//                      </tr>
	//                      <tr>
	//                       <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img class="adapt-img" src="https://wiqyzf.stripocdn.email/content/guids/CABINET_1232eee4cab038122cd07270cd3bb85f/images/70451618316407074.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="260"></td>
	//                      </tr>
	//                      <tr>
	//                       <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#5c68e2;background:#5c68e2;border-width:2px;display:inline-block;border-radius:5px;width:auto"><a href="" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#5C68E2;border-width:10px 30px 10px 30px;display:inline-block;background:#5C68E2;border-radius:5px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;border-left-width:30px;border-right-width:30px">SCHEDULE APPOINTMENT</a></span></td>
	//                      </tr>
	//                    </table></td>
	//                  </tr>
	//                </table></td>
	//              </tr>
	//              <tr>
	//               <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
	//                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                  <tr>
	//                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
	//                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                      <tr>
	//                       <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:26px;Margin-bottom:15px;color:#333333;font-size:26px"><b>How it works:</b></p></td>
	//                      </tr>
	//                    </table></td>
	//                  </tr>
	//                </table></td>
	//              </tr>
	//              <tr>
	//               <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
	//                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
	//                  <tr>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:30px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://wiqyzf.stripocdn.email/content/guids/CABINET_3d0df4c18b0cea2cd3d10f772261e0b3/images/2851617878322771.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="25"></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                   <td style="padding:0;Margin:0;width:20px"></td>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:220px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333;font-size:14px">You schedule an appointment with us by clicking the button above.&nbsp;</p></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                   <td style="padding:0;Margin:0;width:20px"></td>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:30px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://wiqyzf.stripocdn.email/content/guids/CABINET_3d0df4c18b0cea2cd3d10f772261e0b3/images/2851617878322771.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="25"></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                   <td style="padding:0;Margin:0;width:20px"></td>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:220px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333;font-size:14px">You invite your friends to share their opinion. You'll get a bonus.</p></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                  </tr>
	//                </table></td>
	//              </tr>
	//              <tr>
	//               <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
	//                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
	//                  <tr>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:30px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://wiqyzf.stripocdn.email/content/guids/CABINET_3d0df4c18b0cea2cd3d10f772261e0b3/images/2851617878322771.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="25"></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                   <td style="padding:0;Margin:0;width:20px"></td>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:220px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333;font-size:14px">You must have been our customer for over a year now.&nbsp;</p></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                   <td style="padding:0;Margin:0;width:20px"></td>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:30px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://wiqyzf.stripocdn.email/content/guids/CABINET_3d0df4c18b0cea2cd3d10f772261e0b3/images/2851617878322771.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="25"></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                   <td style="padding:0;Margin:0;width:20px"></td>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:220px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333;font-size:14px">We meet for an interview. It lasts as long as you like.</p></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                  </tr>
	//                </table></td>
	//              </tr>
	//              <tr>
	//               <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px">
	//                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
	//                  <tr>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:30px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://wiqyzf.stripocdn.email/content/guids/CABINET_3d0df4c18b0cea2cd3d10f772261e0b3/images/2851617878322771.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="25"></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                   <td style="padding:0;Margin:0;width:20px"></td>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:220px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333;font-size:14px">You must have bought more than one piece of clothes with us.</p></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                   <td style="padding:0;Margin:0;width:20px"></td>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:30px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://wiqyzf.stripocdn.email/content/guids/CABINET_3d0df4c18b0cea2cd3d10f772261e0b3/images/2851617878322771.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="25"></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                   <td style="padding:0;Margin:0;width:20px"></td>
	//                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
	//                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
	//                      <tr>
	//                       <td align="left" style="padding:0;Margin:0;width:220px">
	//                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333;font-size:14px">You choose a present for yourself. We send it for free.</p></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                  </tr>
	//                </table></td>
	//              </tr>
	//            </table></td>
	//          </tr>
	//        </table>
	//        <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
	//          <tr>
	//           <td align="center" style="padding:0;Margin:0">
	//            <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px">
	//              <tr>
	//               <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
	//                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                  <tr>
	//                   <td align="left" style="padding:0;Margin:0;width:600px">
	//                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                      <tr>
	//                       <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0">
	//                        <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr>
	//                           <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Facebook" src="https://wiqyzf.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
	//                           <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Twitter" src="https://wiqyzf.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
	//                           <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Instagram" src="https://wiqyzf.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
	//                           <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://wiqyzf.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                      <tr>
	//                       <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;Margin-bottom:15px;color:#333333;font-size:12px">RCM App&nbsp;© 2022&nbsp;All Rights Reserved.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;Margin-bottom:15px;color:#333333;font-size:12px">Yogyakarta, Indonesia</p></td>
	//                      </tr>
	//                      <tr>
	//                       <td style="padding:0;Margin:0">
	//                        <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                          <tr class="links">
	//                           <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#999999;font-size:12px">Visit Us </a></td>
	//                           <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0;border-left:1px solid #cccccc"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#999999;font-size:12px">Privacy Policy</a></td>
	//                           <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0;border-left:1px solid #cccccc"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#999999;font-size:12px">Terms of Use</a></td>
	//                          </tr>
	//                        </table></td>
	//                      </tr>
	//                    </table></td>
	//                  </tr>
	//                </table></td>
	//              </tr>
	//            </table></td>
	//          </tr>
	//        </table>
	//        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
	//          <tr>
	//           <td class="es-info-area" align="center" style="padding:0;Margin:0">
	//            <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF">
	//              <tr>
	//               <td align="left" style="padding:20px;Margin:0">
	//                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                  <tr>
	//                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
	//                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
	//                      <tr>
	//                       <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;Margin-bottom:15px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td>
	//                      </tr>
	//                    </table></td>
	//                  </tr>
	//                </table></td>
	//              </tr>
	//            </table></td>
	//          </tr>
	//        </table></td>
	//      </tr>
	//    </table>
	//   </div>
	//  </body>
	// </html>
	//   `;

	const html = `
    <!doctype html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 max-h-screen text-justify p-6 space-y-2">
      <img
        src="https://rcm-ui.vercel.app/static/media/Logo.16a2fcc2.png"
        alt=""
        class='h-24 mx-auto'
      />
      <h1 class="text-5xl font-bold text-center">Meeting Invitation</h1>
      <h2 class="text-2xl font-semibold">${title}</h2>
      <p class="text-xl text-gray-500">
        ${meeting_desc}
      </p>
      <p class="text-xl text-gray-800">Date: 2022-12-31 16:00:00</p>
      <p class="text-xl text-gray-800">Link: </p>
      <a
        class="bg-blue-500 text-white px-2 py-1 flex-sink"
        href="${meeting_link}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join Meeting
      </a>
    </body>
    <footer className="bg-gray-200 p-8 text-center">
      RCM App © 2022 Yogyakarta, Indonesia
    </footer>
    </html>
  `;
	return html;
};

module.exports = {
	transporter,
	invitataionHtmlTemplate,
};
