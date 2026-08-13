'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"


export default function Additem() {

    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | string>('');
    const [category, setCategory] = useState('');
    const [productStatus, setProductStatus] = useState('');
    const [location, setLocation] = useState('');

    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!title || !description || price === '' || !category || !productStatus || !location) {
            alert("모든 필드를 입력해 주세요.");
            return;
        }

        try {
            const response = await fetch("/api/products/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    price: Number(price),
                    category,
                    productStatus: "AVAILABLE",
                    location,
                    images: imageUrl ? [imageUrl] : [],
                }),
            });

            if (response.ok) {
                alert("물품 등록이 완료되었습니다!");
                router.push("/listup");
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert(`등록 실패: ${errorData.message || "서버 에러가 발생했습니다."}`);
            }
        } catch (error) {
            console.error("등록 중 에러 발생:", error);
            alert("네트워크 에러가 발생했습니다. 다시 시도해 주세요.");
        }
    };




    return (
        <div className="additem-container">
            <h2> 물품 등록 </h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="이름" className="additem-box" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="물건 설명" className="additem-box" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="가격" className="additem-box" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                <input type="text" placeholder="장소" className="additem-box" value={location} onChange={(e) => setLocation(e.target.value)} />

                <input
                    type="url"
                    placeholder="이미지 URL 주소 (예: https://...)"
                    className="additem-box"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                {imageUrl && (
                    <div style={{ margin: '10px 0', textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>이미지 미리보기</p>
                        <img
                            src={imageUrl}
                            alt="미리보기"
                            style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px', objectFit: 'cover' }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>
                )}

                <div className="category-ui">
                    <label className="category-title">카테고리</label>
                    <select
                        className="category-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">카테고리를 선택하세요</option>
                        <option value="TOY">장난감</option>
                        <option value="BOOK">도서</option>
                        <option value="TOOL">공구/도구</option>
                        <option value="ELECTRONICS">전자기기</option>
                        <option value="SPORTS">스포츠용품</option>
                        <option value="ETC">기타</option>
                    </select>
                </div>

                <div className="status-ui">
                    <label className="status-title">상품 상태</label>
                    <select
                        className="status-select"
                        value={productStatus}
                        onChange={(e) => setProductStatus(e.target.value)}
                        required
                    >
                        <option value="">상품 상태를 선택하세요</option>
                        <option value="NEW">새 상품 (미개봉)</option>
                        <option value="LIKE_NEW">거의 새것</option>
                        <option value="GOOD">사용감 적음</option>
                        <option value="USED">사용감 많음</option>
                    </select>
                </div>


                <button type="submit">등록하기</button>
            </form>
        </div>
    )
}