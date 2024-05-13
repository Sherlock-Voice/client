import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import LoadingLottie from '/Users/youngjunhan/Desktop/24-1/종설/Sherlock_Voice/Sherlock_Voice-Web/public/assets/lottie/LoadingLottie.json';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Container = styled.div`
  width: 300px;
  margin: 50px auto;
  text-align: center;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 180px;
  background-color: #fff; 
`;

const LoadingAnimation = styled(Lottie)`
  width: 300px;
  height: 300px;
`;

const LoadingText = styled.div`
  margin-top: 60px;
  font-size: 24px;
  color: #333;
  line-height: 36px;
`;

const Loading = () => {
  const { taskId } = useParams(); // URL 파라미터에서 task_id를 가져옵니다.
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing'); // 초기 상태는 'processing'

  useEffect(() => {
      const checkStatus = async () => {
          try {
              const response = await fetch(`http://127.0.0.1:8000/loading/${taskId}`, {
                  method: 'GET',
                  headers: {
                      'Accept': 'application/json'
                  }
              });
              const data = await response.json();
              if (data.status === 'ready') {
                  navigate('/voiceResult'); // 작업이 완료되면 결과 페이지로 이동
              } else {
                  setTimeout(checkStatus, 2000); // 2초 후에 다시 상태 확인
              }
          } catch (error) {
              console.error('Error checking status:', error);
              setTimeout(checkStatus, 2000); // 오류 발생 시 2초 후에 다시 시도
          }
      };

      checkStatus(); // 컴포넌트 마운트 시 작업 상태 확인 시작

      return () => {
          // Cleanup function to prevent memory leaks or unwanted timeouts
      };
  }, [navigate, taskId]); // taskId가 변경될 때마다 효과를 다시 실행
  
  return (
    <Container>
        <Header/>
        <PageContainer>
            <LoadingAnimation animationData={LoadingLottie} loop={true} />
            <LoadingText>녹음 파일을 분석 중입니다.<br/>잠시만 기다려주세요...</LoadingText>
        </PageContainer>
        <Footer/>
    </Container>
);
};

export default Loading;