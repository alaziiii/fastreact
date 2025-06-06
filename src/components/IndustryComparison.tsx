import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ColumnType = 'shein' | 'traditional' | 'sustainable';

interface TableRowData {
  factor: string;
  shein: string;
  traditional: string;
  sustainable: string;
  info: string;
}

const IndustryComparison: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [expandedInfo, setExpandedInfo] = useState<number | null>(null);

  const tableData: TableRowData[] = [
    {
      factor: "Neue Styles pro Monat",
      shein: "300.000+",
      traditional: "1.000-5.000",
      sustainable: "50-500",
      info: "Die Anzahl neuer Designs hat einen direkten Einfluss auf Überproduktion und Ressourcenverschwendung. SHEIN produziert etwa 6.000 neue Styles pro Tag."
    },
    {
      factor: "Durchschnittliche Lebensdauer",
      shein: "5-10 Tragungen",
      traditional: "30-50 Tragungen",
      sustainable: "100+ Tragungen",
      info: "Je länger ein Kleidungsstück getragen wird, desto besser ist seine Gesamtumweltbilanz. Nachhaltige Marken setzen auf zeitlose Designs und hochwertige Materialien."
    },
    {
      factor: "Wasserverbrauch pro Artikel",
      shein: "Hoch (2.500-7.500 Liter)",
      traditional: "Mittel (1.900-5.700 Liter)",
      sustainable: "Niedrig (380-1.900 Liter)",
      info: "Die Textilproduktion, insbesondere von Baumwolle, verbraucht enorme Mengen an Wasser. Ein einziges T-Shirt kann bis zu 2.700 Liter Wasser in der Herstellung benötigen."
    },
    {
      factor: "CO₂-Fußabdruck",
      shein: "Sehr hoch (Luftfracht)",
      traditional: "Hoch (See & Land)",
      sustainable: "Niedrig (lokale Produktion)",
      info: "Ultra-Fast-Fashion-Marken nutzen häufig Luftfracht, um Lieferzeiten zu verkürzen, was bis zu 50-mal mehr CO₂ verursacht als Seefracht."
    },
    {
      factor: "Giftstoffe & Chemikalien",
      shein: "Hoch (weniger Kontrolle)",
      traditional: "Mittel (einige Kontrollen)",
      sustainable: "Niedrig (natürliche Färbung)",
      info: "Die Textilproduktion verwendet über 8.000 verschiedene Chemikalien. Nachhaltige Marken setzen auf natürliche Farbstoffe und zertifizierte Produktionsverfahren."
    }
  ];

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5
      }
    })
  };

  const infoCardVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 }
    }
  };

  const getStatusColor = (column: ColumnType) => {
    switch (column) {
      case 'shein':
        return { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400' };
      case 'traditional':
        return { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400' };
      case 'sustainable':
        return { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' };
      default:
        return { bg: '', text: '' };
    }
  };

  const handleInfoToggle = (index: number) => {
    setExpandedInfo(expandedInfo === index ? null : index);
  };

  return (
    <section id='industry' className="py-20 bg-white dark:bg-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-300/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-300/10 rounded-full -ml-40 -mb-40 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block mb-2 px-4 py-1 rounded-full bg-red-100 dark:bg-red-900/30"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="text-sm font-medium text-red-700 dark:text-red-300">Umweltauswirkungen</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Branchenvergleich der Auswirkungen
          </motion.h2>

          <motion.p
            className="text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            SHEIN im Vergleich zu traditionellem Einzelhandel und nachhaltigen Alternativen
          </motion.p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden shadow-xl rounded-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  {['Auswirkungsfaktor', 'shein', 'traditional', 'sustainable'].map((column: string, index: number) => (
                    <motion.th
                      key={index}
                      scope="col"
                      className={`px-6 py-4 ${index === 0 ? 'text-left' : 'text-center'}`}
                      custom={index}
                      variants={columnVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {index === 0 ? (
                        column
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className={`font-semibold ${getStatusColor(column as ColumnType).text}`}>
                            {column === 'shein' && 'SHEIN'}
                            {column === 'traditional' && 'Traditioneller Handel'}
                            {column === 'sustainable' && 'Nachhaltige Marken'}
                          </span>
                          <span className="text-xs opacity-70">
                            {column === 'shein' && '(Ultra-Fast)'}
                            {column === 'traditional' && '(H&M, Zara, etc.)'}
                            {column === 'sustainable' && '(Patagonia, etc.)'}
                          </span>
                        </div>
                      )}
                    </motion.th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    <motion.tr
                      className={`border-b border-slate-200 dark:border-slate-700 ${rowIndex % 2 === 0 ? 'bg-white dark:bg-slate-700' : 'bg-slate-50 dark:bg-slate-600'} ${hoveredRow === rowIndex ? 'bg-slate-100 dark:bg-slate-600' : ''}`}
                      onMouseEnter={() => setHoveredRow(rowIndex)}
                      onMouseLeave={() => setHoveredRow(null)}
                      custom={rowIndex}
                      variants={rowVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <th scope="row" className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                        {row.factor}
                        <motion.button
                          onClick={() => handleInfoToggle(rowIndex)}
                          className="text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full p-1"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </motion.button>
                      </th>

                      {(['shein', 'traditional', 'sustainable'] as ColumnType[]).map((column: ColumnType, i: number) => (
                        <td key={i} className={`px-6 py-4 text-center ${getStatusColor(column).text} font-semibold`}>
                          <motion.div
                            className={`mx-auto px-3 py-1 rounded-lg ${getStatusColor(column).bg}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {row[column]}
                          </motion.div>
                        </td>
                      ))}
                    </motion.tr>

                    {expandedInfo === rowIndex && (
                      <motion.tr
                        variants={infoCardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="border-b border-slate-200 dark:border-slate-700"
                      >
                        <td colSpan={4} className="px-6 py-4">
                          <motion.div
                            className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-slate-700 dark:text-slate-300 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p>{row.info}</p>
                          </motion.div>
                        </td>
                      </motion.tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="h-1 w-1 rounded-full bg-red-400"></span>
            <span className="h-1 w-10 rounded-full bg-red-400"></span>
            <span className="h-1 w-1 rounded-full bg-red-400"></span>
          </div>

          <p>Datenquellen: Umweltbundesamt, Fashion Revolution, Ellen MacArthur Foundation, Quantis</p>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryComparison;