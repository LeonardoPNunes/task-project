import * as React from "react";

const PaginatedUserList = ({ users, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  
  //ordenei pelo nome
  const sortedUsers = [...users].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const currentItems = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Lista de Usuários</h1>
      <div className="space-y-4 text-black">
        {currentItems?.map((user, index) => (
          <div key={index} className="flex flex-col p-4 bg-white rounded-lg shadow border">
            <p className="font-semibold">{user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Cidade: {user?.address?.city}</p>
            <p>Estado: {user?.address?.state}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={goToPreviousPage}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-black"
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <p className="text-sm text-black">
          Página {currentPage} de {totalPages}
        </p>

        <button
          onClick={goToNextPage}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-black"
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default PaginatedUserList;