import React from 'react';
import '../css/result.css'; // CSS 파일 import

function Dashboard() {
    const positiveWidth = '30%'; // 긍정 비율
    const negativeWidth = '70%'; // 부정 비율

    return (
        <div className="result_container mx-auto p-4">
            <div className="flex-1 text-center">
                <h2 className="text-2xl font-bold mb-4">something Word</h2>
            </div>
            <div className="mb-4">
                <div className="bar-container mb-2" style={{ width: '100%' }}>
                    <div className="positive-bar" style={{ width: positiveWidth }}></div>
                    <div className="negative-bar" style={{ width: negativeWidth }}></div>
                </div>
                <div className="text-sm font-medium text-gray-600">Positive bar and negative bar is showing percent.</div>
            </div>
            <div className="list-container md:flex" style={{ width: '100%' }}>
                <div className="list-box" style={{ width: positiveWidth }}>
                    <h3 className="list-title">positive</h3>
                    <div className="article-list">
                        <a href="link_to_article_1" className="article-link">한-네덜란드, ‘반도체 동맹 구축’ 명문화…전략적 동반자관계 구체화</a>
                        <a href="link_to_article_2" className="article-link">한·네 첨단반도체 아카데미 신설…삼성전자·ASML, 1조 원 공동투자</a>
                        <a href="link_to_article_3" className="article-link">동계청소년올림픽대회 감염병 대비·대응 합동 모의훈련 실시</a>
                    </div>
                </div>
                <div className="list-box" style={{ width: negativeWidth }}>
                    <h3 className="list-title">negative</h3>
                    <div className="article-list">
                        <a href="link_to_article_4" className="article-link">윤 대통령 “한국·네덜란드 반도체 협력, 이제 ‘반도체 동맹’으로 격상될 것”</a>
                        <a href="link_to_article_5" className="article-link">상반기분 근로장려금 12일 일괄 지급…가구당 47만 원</a>
                        <a href="link_to_article_6" className="article-link">생필품 용량 등 변경 땐 반드시 표시…‘슈링크플레이션’ 억제 조치</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
