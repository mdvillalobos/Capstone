import { useContext } from 'react'
import { RankContext } from '../../../../context/rankContext';
import { MdFileDownload } from "react-icons/md";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../../../assets/images/logo.png'

const ToPdf = ({ totalRank, approvedFaculty }) => {
    const { ranks } = useContext(RankContext);
    const generatePDF = () => {
        const doc = new jsPDF();
    
        const logoWidth = 60;
        const logoHeight = 15; 
        const pageWidth = doc.internal.pageSize.width;
        
        doc.addImage(logo, 'PNG', (pageWidth - logoWidth) / 2, 10, logoWidth, logoHeight); 
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        let yPosition = 10 + logoHeight + 10; 
        let pageCount = 1; 

        const addFooter = () => {
            const footerText = `Page ${pageCount}`;
            doc.setFontSize(10);
            doc.text(footerText, pageWidth - 30, doc.internal.pageSize.height - 10, { align: "right" });
        };
    
        doc.text('Rank Count:', 15, yPosition);
        yPosition += 10; 
        
        const tableData = ranks.map(rank => {
            const count = totalRank[rank.rankName] || 0;
            return [rank.rankName, count];
        });
    
        autoTable(doc, {
            head: [['Rank Name', 'Count']],
            body: tableData.map(row => [row[0], row[1]]),
            startY: yPosition,
            margin: { top: 10 },
            theme: 'striped',
        });

        addFooter();
        pageCount++;
    
        doc.addPage();
        yPosition = 10;
    
        doc.text('Promoted Faculty:', 15, yPosition);
        yPosition += 10; 
        const approvedFacultyData = approvedFaculty.map(data => {
            return { name: data.name, newRank: data.applyingFor };
        });
    
        autoTable(doc, {
            head: [['Name', 'New Rank']],
            body: approvedFacultyData.map(row => [row.name, row.newRank]),
            startY: yPosition,
            margin: { top: 10 },
            theme: 'striped',
        });

        addFooter();

        doc.save('ranking_data.pdf');
      };

    return (
        <div className='flex justify-between'>
            <p className='text-sm font-medium tracking-widest text-TextSecondary my-auto'>ANALYTICS</p>
            <button 
                onClick={generatePDF} 
                className='px-4 py-2 text-xs text-white duration-200 rounded-md cursor-pointer bg-NuBlue hover:shadow-md hover:scale-105'>
                <span className="my-auto">Export Data</span>
            </button>

            <div  className='hidden'>
                {ranks.map(rank => {
                    const count = totalRank[rank.rankName] || 0

                    return ( 
                        <div key={rank._id}>
                            <p>{rank.rankName}</p>
                            <p>{count}</p>
                        </div>
                    )
                })}
            </div>
       </div>
    )
}

export default ToPdf
