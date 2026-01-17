import {DocumentActionComponent} from 'sanity'
import {DownloadIcon} from '@sanity/icons'
import {createClient} from '@sanity/client'

export const exportRegistrationPDF: DocumentActionComponent = (props) => {
  // Only show for registration documents (double-check since we filter in config)
  // Access schemaType from props with type assertion since types might be incomplete
  const schemaType = (props as any).schemaType
  if (schemaType !== 'registration') {
    return null
  }

  return {
    label: 'Export as PDF',
    icon: DownloadIcon as any,
    shortcut: undefined,
    onHandle: async () => {
      try {
        // Dynamically import jsPDF to avoid bundling issues
        const {default: jsPDF} = await import('jspdf')

        // Create client with project details (use hardcoded values for now)
        const client = createClient({
          projectId: '1bny7eub',
          dataset: 'production',
          apiVersion: '2024-01-01',
          useCdn: false,
        })
        
        // Fetch the full document with all referenced data
        const doc = await client.fetch(
          `*[_id == $id][0]{
            _id,
            firstName,
            lastName,
            email,
            phone,
            reason,
            additionalInfo,
            hearAbout,
            convenientTime,
            registeredAt,
            status,
            adminNotes,
            "program": program->{
              title,
              description,
              location,
              startDate,
              endDate,
              registrationDeadline
            }
          }`,
          {id: (props as any).id}
        )

        if (!doc) {
          ;(props as any).onComplete()
          return
        }

        // Create PDF
        const pdf = new jsPDF()
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const margin = 20
        let yPosition = margin

        // Helper function to add text with word wrap
        const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12) => {
          pdf.setFontSize(fontSize)
          const lines = pdf.splitTextToSize(text || '', maxWidth)
          pdf.text(lines, x, y)
          return y + (lines.length * fontSize * 0.35) + 5
        }

        // Header
        pdf.setFontSize(20)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Registration Form', margin, yPosition)
        yPosition += 15

        // Draw a line
        pdf.setLineWidth(0.5)
        pdf.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 10

        // Program Information Section
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Program Information', margin, yPosition)
        yPosition += 10

        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'normal')

        if (doc.program) {
          yPosition = addText(`Program: ${doc.program.title || 'N/A'}`, margin, yPosition, pageWidth - 2 * margin, 12)
          if (doc.program.location) {
            yPosition = addText(`Location: ${doc.program.location}`, margin, yPosition, pageWidth - 2 * margin, 12)
          }
          if (doc.program.startDate) {
            const startDate = new Date(doc.program.startDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            yPosition = addText(`Start Date: ${startDate}`, margin, yPosition, pageWidth - 2 * margin, 12)
          }
          if (doc.program.endDate) {
            const endDate = new Date(doc.program.endDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            yPosition = addText(`End Date: ${endDate}`, margin, yPosition, pageWidth - 2 * margin, 12)
          }
          if (doc.program.registrationDeadline) {
            const deadline = new Date(doc.program.registrationDeadline).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            yPosition = addText(`Registration Deadline: ${deadline}`, margin, yPosition, pageWidth - 2 * margin, 12)
          }
        }

        yPosition += 5

        // Draw a line
        pdf.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 10

        // Personal Information Section
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Personal Information', margin, yPosition)
        yPosition += 10

        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'normal')

        yPosition = addText(`Name: ${doc.firstName || ''} ${doc.lastName || ''}`, margin, yPosition, pageWidth - 2 * margin, 12)
        yPosition = addText(`Email: ${doc.email || 'N/A'}`, margin, yPosition, pageWidth - 2 * margin, 12)
        if (doc.phone) {
          yPosition = addText(`Phone: ${doc.phone}`, margin, yPosition, pageWidth - 2 * margin, 12)
        }

        yPosition += 5

        // Draw a line
        pdf.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 10

        // Registration Details Section
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Registration Details', margin, yPosition)
        yPosition += 10

        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'normal')

        if (doc.registeredAt) {
          const regDate = new Date(doc.registeredAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
          yPosition = addText(`Registered At: ${regDate}`, margin, yPosition, pageWidth - 2 * margin, 12)
        }

        yPosition = addText(`Status: ${doc.status ? doc.status.charAt(0).toUpperCase() + doc.status.slice(1) : 'Pending'}`, margin, yPosition, pageWidth - 2 * margin, 12)

        yPosition += 5

        // Draw a line
        pdf.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 10

        // Reason Section
        if (doc.reason) {
          pdf.setFontSize(16)
          pdf.setFont('helvetica', 'bold')
          pdf.text('Reason for Registering', margin, yPosition)
          yPosition += 10

          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'normal')
          yPosition = addText(doc.reason, margin, yPosition, pageWidth - 2 * margin, 12)

          yPosition += 5
          pdf.line(margin, yPosition, pageWidth - margin, yPosition)
          yPosition += 10
        }

        // Additional Information Section
        if (doc.additionalInfo) {
          pdf.setFontSize(16)
          pdf.setFont('helvetica', 'bold')
          pdf.text('Additional Information', margin, yPosition)
          yPosition += 10

          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'normal')
          yPosition = addText(doc.additionalInfo, margin, yPosition, pageWidth - 2 * margin, 12)

          yPosition += 5
          pdf.line(margin, yPosition, pageWidth - margin, yPosition)
          yPosition += 10
        }

        // Where did you hear about this course Section
        if (doc.hearAbout) {
          pdf.setFontSize(16)
          pdf.setFont('helvetica', 'bold')
          pdf.text('Where did you hear about this leadership course?', margin, yPosition)
          yPosition += 10

          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'normal')
          yPosition = addText(doc.hearAbout, margin, yPosition, pageWidth - 2 * margin, 12)

          yPosition += 5
          pdf.line(margin, yPosition, pageWidth - margin, yPosition)
          yPosition += 10
        }

        // Most convenient time Section
        if (doc.convenientTime) {
          pdf.setFontSize(16)
          pdf.setFont('helvetica', 'bold')
          pdf.text('Most Convenient Time to Join Online', margin, yPosition)
          yPosition += 10

          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'normal')
          yPosition = addText(doc.convenientTime, margin, yPosition, pageWidth - 2 * margin, 12)

          yPosition += 5
          pdf.line(margin, yPosition, pageWidth - margin, yPosition)
          yPosition += 10
        }

        // Admin Notes Section (if present)
        if (doc.adminNotes) {
          // Check if we need a new page
          if (yPosition > pageHeight - 40) {
            pdf.addPage()
            yPosition = margin
          }

          pdf.setFontSize(16)
          pdf.setFont('helvetica', 'bold')
          pdf.text('Admin Notes', margin, yPosition)
          yPosition += 10

          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'normal')
          yPosition = addText(doc.adminNotes, margin, yPosition, pageWidth - 2 * margin, 12)
        }

        // Footer
        const totalPages = pdf.internal.pages.length - 1
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i)
          pdf.setFontSize(10)
          pdf.setFont('helvetica', 'italic')
          pdf.text(
            `Page ${i} of ${totalPages}`,
            pageWidth / 2,
            pageHeight - 10,
            {align: 'center'}
          )
          pdf.text(
            `Generated on ${new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}`,
            pageWidth / 2,
            pageHeight - 5,
            {align: 'center'}
          )
        }

        // Generate filename
        const filename = `Registration_${doc.firstName || 'Unknown'}_${doc.lastName || 'Unknown'}_${doc._id.slice(-6)}.pdf`

        // Save PDF
        pdf.save(filename)

        ;(props as any).onComplete()
      } catch (error) {
        console.error('Error generating PDF:', error)
        alert('Error generating PDF. Please try again.')
        ;(props as any).onComplete()
      }
    },
  }
}
