// Modal.tsx (mypage/components/Modal.tsx)
// 시험용 모달페이지(삭제 예정)

// export default function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
//     return (
//       <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white rounded-xl p-6 relative w-[80%] max-w-md">
//           <button
//             onClick={onClose}
//             className="absolute top-2 right-2 text-black text-xl"
//           >
//             ×
//           </button>
//           {children}
//         </div>
//       </div>
//     );
//   }
  
///////////////////////////////////////////////////

// page.tsx에서 실행해야함!
// import Modal from "./components/Modal";

// export default function Home() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         프로필 이미지 보기
//       </button>

//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <p className="text-black">여기에 이미지나 갤러리를 넣을 수 있어요.</p>
//         </Modal>
//       )}
//     </>
//   );
// }
