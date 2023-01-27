import { setApiKey, send, MailDataRequired } from "@sendgrid/mail";

type MailOptions = {
    to?:string,
    subject?:string,
    templateId?:string,
    templateData?:{[key: string]: any},
    html?:string
};

export let ParseServerSendGrid = ({
    apiKey,
    from,
    passwordResetTemplateId,
    verificationTemplateId
}) => {
    var missing:string | undefined;

    if(!apiKey) { missing = "API key"; }
    else if(!from) { missing = "FROM email address"; }
    else if(!passwordResetTemplateId) { missing = "password reset template ID"; }
    else if(!verificationTemplateId) { missing = "email verification template ID"; }

    if(missing) { throw `The ${missing} is needed to send emails with SendGrid`; }

    setApiKey(apiKey);

    const sendMail = ({
        to,
        subject,
        templateId,
        templateData,
        html
    }:MailOptions) => {
        if(!templateId && !html) throw "Please provide a template ID or HTML to send an email.";

        let email:MailDataRequired | undefined;

        if(templateId)
        {
            email = {
                from, to, subject,
                templateId: templateId!,
                dynamicTemplateData: templateData
            }
        }
        else if(html)
        {
            email = {
                from, to, subject,
                html: html!,
                dynamicTemplateData: templateData
            }
        }

        return send(email!);
    };

    const sendPasswordResetEmail = ({
        link,
        appName,
        user
    }) => {
        let to = user.get("email") || user.get("username");
        return sendMail({
            to,
            templateId: passwordResetTemplateId,
            templateData: {
                link,
                appName,
                email: to
            }
        });
    };

    const sendVerificationEmail = ({
        link,
        appName,
        user
    }) => {
        let to = user.get("email") || user.get("username");
        return sendMail({
            to,
            templateId: passwordResetTemplateId,
            templateData: {
                link,
                appName,
                email: to
            }
        });
    };

    return Object.freeze({
        sendMail,
        sendPasswordResetEmail,
        sendVerificationEmail
    });
};

export default ParseServerSendGrid;