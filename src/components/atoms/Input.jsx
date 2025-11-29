export default function Input({ className, ...props}) {
    return (
        // ...props sẽ lấy tất cả, toàn bộ các prop được truyền ở trên rải xuống
        <input className={className} {...props}/>
    )
}