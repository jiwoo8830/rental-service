import Image from "next/image";
import Link from "next/link";
import { Search, Shield, Package, User } from "lucide-react";

export default function Home() {
  return (
    <div className="homepage">
      <section className="section-1">
        <div>이웃과 함께하는<br/>스마트한 물건 대여</div>
        <div>필요한 물건을 빌리고, 쓰지 않는 물건을 대여해주세요.<br/>서로 돕는 공유 경제를 경험하세요.</div>
        <div className="hsi-3">
            <Link href="/listup" className="register-btn1"><Search/>물건찾기</Link>
            <Link href="/myitem" className="register-btn2">내 물건 등록하기</Link>
        </div>
      </section>
      <section className="section-2">
        <div className="sh1">왜 물물대여를 선택해야 할까요?</div>
        <div className="container1">
          <div className="card">
            <Package/>
            <p className="cci-1">다양한 물건</p>
            <p className="cci-2">공구부터 캠핑 장비, 전자기기까지 다양한 물건을 빌릴 수 있습니다.</p>
            </div>
          <div className="card">
            <Shield/>
            <p className="cci-1">안전한 거래</p>
            <p className="cci-2">사용자 평점 시스템과 후기로 믿을 수 있는 거래를 보장합니다.</p>
          </div>
          <div className="card">
            <User/>
            <p className="cci-1">이웃과 연결</p>
            <p className="cci-2">가까운 이웃과 물건을 공유하여 지역 커뮤니티를 활성화합니다.</p>
          </div>
        </div>
      </section>
      <section className="section-3">
        <div className="cci-1">지금 바로 시작하세요</div>
        <div className="cci-2">필요한 물건을 찾거나, 쓰지 않는 물건으로 수익을 창출하세요.</div>
        <Link href="/" className="sbtn-1">물건 둘러보기</Link>
      </section>
      <footer className="footer-1">@2026 물물대여. 모든 권리 보유.</footer>
    </div>
  );
}
