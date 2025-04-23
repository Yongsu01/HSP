interface UserRoleProps {
    userRole: string;
    setRole: (value: string) => void;
  }
  
  const roles = [
    { label: '트레이너', value: 'trainer' },
    { label: '회원', value: 'member' },
  ];
  
  const UserRole: React.FC<UserRoleProps> = ({ userRole, setRole }) => {
    return (
      <div className="flex flex-col text-start gap-[10px] w-full">
        <p className="text-white text-[17px]">사용자 역할</p>
        <select
          value={userRole || ""}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 rounded text-black w-full"
        >
          <option value="" disabled hidden>
            사용자 역할을 골라주세요
          </option>
          {roles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default UserRole;
  