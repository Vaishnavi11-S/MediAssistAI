import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileMedical, FaUpload, FaDownload, FaEye, FaTrash, FaSearch } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const MedicalReports = () => {
  const { isDark } = useTheme();
  const [reports, setReports] = useState([
    { 
      id: 1, 
      name: 'Blood Test Report.pdf', 
      date: '2024-01-15', 
      type: 'PDF', 
      summary: 'Normal blood count, slightly elevated cholesterol',
      summaryData: {
        summary: 'Normal blood count, slightly elevated cholesterol',
        keyFindings: ['Hemoglobin normal', 'WBC count normal', 'Cholesterol slightly elevated'],
        abnormalValues: ['Cholesterol: 240 mg/dL (Elevated)'],
        recommendations: ['Monitor cholesterol levels', 'Consider dietary changes'],
        doctorAdvice: 'Follow up with your doctor in 3 months',
        disclaimer: 'This is educational information only.'
      }
    },
    { 
      id: 2, 
      name: 'X-Ray Report.jpg', 
      date: '2024-01-10', 
      type: 'Image', 
      summary: 'No abnormalities detected in chest X-ray',
      summaryData: {
        summary: 'No abnormalities detected in chest X-ray',
        keyFindings: ['Clear lung fields', 'Normal heart size', 'No fractures'],
        abnormalValues: [],
        recommendations: ['Continue regular checkups'],
        doctorAdvice: 'No immediate action required',
        disclaimer: 'This is educational information only.'
      }
    },
    { 
      id: 3, 
      name: 'Lab Results.docx', 
      date: '2024-01-05', 
      type: 'DOCX', 
      summary: 'All parameters within normal range',
      summaryData: {
        summary: 'All parameters within normal range',
        keyFindings: ['All blood work normal', 'No infections detected'],
        abnormalValues: [],
        recommendations: ['Maintain healthy lifestyle'],
        doctorAdvice: 'Routine follow-up recommended',
        disclaimer: 'This is educational information only.'
      }
    },
  ]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    onDrop: (acceptedFiles) => {
      handleUpload(acceptedFiles[0]);
    }
  });

  const handleUpload = async (file) => {
    setIsUploading(true);

    try {
      // For text files, read content; for others, use placeholder
      let reportText = '';
      if (file.type === 'text/plain') {
        reportText = await file.text();
      } else {
        // For PDF/images, we'd need OCR. For now, use a sample or ask user to input
        reportText = 'Blood Test Results:\nHemoglobin: 13.5 g/dL (Normal)\nWBC Count: 7500 cells/mcL (Normal)\nPlatelet Count: 250,000/mcL (Normal)\nCholesterol: 240 mg/dL (Elevated)\nBlood Sugar: 110 mg/dL (Normal)\n\nNote: For PDF/Image files, please paste the report text manually or use OCR in production.';
      }

      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:8080/api/medical-reports/summarize',
        { reportText: reportText },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log("Raw response:", response.data);

      let summaryData;
      let analysis = response.data.summary;

      console.log("SUMMARY:", analysis);

      // If backend already returned the fallback JSON directly
      if (typeof analysis === 'object' && analysis !== null) {
        summaryData = analysis;
      } else if (typeof analysis === "string") {
        try {
          analysis = JSON.parse(analysis);
        } catch (e) {
          console.error("First parse failed:", e);
        }

        console.log("ANALYSIS:", analysis);

        // Check if it's a Gemini response structure
        let aiText = analysis?.candidates?.[0]?.content?.parts?.[0]?.text;

        // If not, it might be the JSON directly
        if (!aiText && typeof analysis === "string") {
          aiText = analysis;
        }

        console.log("AI TEXT:", aiText);

        if (aiText) {
          try {
            summaryData = JSON.parse(aiText);
          } catch (e) {
            console.error("Second parse failed:", e);

            // Try to extract JSON from markdown
            const jsonMatch =
              aiText.match(/```json\s*([\s\S]*?)\s*```/) ||
              aiText.match(/```\s*([\s\S]*?)\s*```/);

            if (jsonMatch) {
              summaryData = JSON.parse(jsonMatch[1]);
            }
          }
        }
      }

      console.log("SUMMARY DATA:", summaryData);

      const newReport = {
        id: Date.now(),
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        type: file.name.split('.').pop().toUpperCase(),
        summary: summaryData?.summary || 'Summary processing...',
        summaryData: summaryData
      };

      setReports([newReport, ...reports]);
      toast.success('Report uploaded and summarized successfully!');

    } catch (error) {
  console.error("Upload error:", error);
  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
  console.log("Message:", error.message);
  const token = localStorage.getItem("token");
console.log("TOKEN:", token);

  toast.error(
    "Failed to summarize report: " +
    (error.response?.data?.message || error.message)
  );
} finally {
  setIsUploading(false);
}
  };
  const handleDelete = (id) => {
    setReports(reports.filter(r => r.id !== id));
    toast.success('Report deleted');
  };

  const filteredReports = reports.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex ${isDark ? 'dark' : ''}`}>
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Medical Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Upload and manage your medical reports with AI-powered summaries
            </p>
          </motion.div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
                isDragActive
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-slate-600 hover:border-primary-500 dark:hover:border-primary-500'
              }`}
            >
              <input {...getInputProps()} />
              <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-gray-600 dark:text-gray-400">Drop the file here...</p>
              ) : (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Drag & drop a medical report here, or click to select
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Supports PDF, DOCX, TXT, and Images
                  </p>
                </>
              )}
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white"
              />
            </div>
          </motion.div>

          {/* Reports List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid gap-4"
          >
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <FaFileMedical className="text-primary-600 dark:text-primary-400 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{report.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {report.date} • {report.type}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                        {report.summary}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
                    >
                      <FaEye className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
                      <FaDownload className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Summary Modal */}
          {selectedReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedReport(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Report Summary
                  </h3>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  {selectedReport.summaryData ? (
                    <>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Summary</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {selectedReport.summaryData.summary}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Findings</h4>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                          {selectedReport.summaryData.keyFindings?.map((finding, index) => (
                            <li key={index}>{finding}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Abnormal Values</h4>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                          {selectedReport.summaryData.abnormalValues?.length > 0 ? (
                            selectedReport.summaryData.abnormalValues.map((value, index) => (
                              <li key={index}>{value}</li>
                            ))
                          ) : (
                            <li className="text-green-600">No significant abnormalities detected</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Recommendations</h4>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                          {selectedReport.summaryData.recommendations?.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Doctor's Advice</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {selectedReport.summaryData.doctorAdvice}
                        </p>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          {selectedReport.summaryData.disclaimer}
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No detailed summary available. This report was uploaded before AI summarization was enabled.
                    </p>
                  )}
                </div>
                <button className="mt-6 w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">
                  Download Summary
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MedicalReports;
