import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        axios.get("http://localhost:8000/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => setProfile(res.data))
        .catch(err => {
            console.error(err);
            alert("프로필 정보를 가져오지 못했습니다.");
        });
    }, []);

    if (!profile) return <p>로딩 중...</p>;

    return (
        <div>
            <h2>내 프로필</h2>
            <p><strong>이메일:</strong> {profile.email}</p>
            <p><strong>이름:</strong> {profile.username}</p>
            {profile.profile_image_url ? (
                <img src={profile.profile_image_url} alt="프로필 이미지" style={{ width: "150px", borderRadius: "50%" }} />
            ) : (
                <p>프로필 이미지 없음</p>
            )}
        </div>
    );
}