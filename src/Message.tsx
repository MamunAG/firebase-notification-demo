/* eslint-disable @typescript-eslint/no-explicit-any */
const Message = ({ notification }: { notification: any }) => {
    console.log(notification);
    return (
        <>
            <div id="notificationHeader">
                {/* image is optional */}
                {notification.image && (
                    <div id="imageContainer">
                        <img src={notification.image} width={100} />
                    </div>
                )}
                <span>{notification.title}</span>
            </div>
            <div id="notificationBody">{notification.body}</div>
        </>
    );
};

export default Message;