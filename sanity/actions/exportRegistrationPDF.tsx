import {useClient} from 'sanity'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

// Initialize pdfMake with fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs

interface Registration {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  reason?: string
  additionalInfo?: string
  hearAbout?: string
  convenientTime?: string
  registeredAt?: string
  status?: string
  adminNotes?: string
  program?: {
    _ref: string
  }
}

interface Program {
  title: string
  startDate?: string
  location?: string
  category?: string
}

export function exportRegistrationPDF(props: {id: string; type: string; published: Registration | null}) {
  const client = useClient({apiVersion: '2024-01-01'})

  const handleExport = async () => {
    if (!props.published) {
      alert('Please save the document before exporting.')
      return
    }

    const registration = props.published

    // Fetch program details
    let program: Program | null = null
    if (registration.program?._ref) {
      program = await client.fetch(
        `*[_type == "program" && _id == $id][0]{title, startDate, location, category}`,
        {id: registration.program._ref}
      )
    }

    const formatDate = (dateString?: string) => {
      if (!dateString) return 'N/A'
      try {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      } catch {
        return dateString
      }
    }

    const statusColors: Record<string, string> = {
      pending: '#f59e0b',
      approved: '#10b981',
      rejected: '#ef4444',
      waitlisted: '#6366f1',
    }

    const docDefinition: any = {
      content: [
        {
          text: 'MEDIA ARISE',
          style: 'header',
          alignment: 'center',
        },
        {
          text: 'Registration Details',
          style: 'subheader',
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 515,
              y2: 0,
              lineWidth: 1,
              lineColor: '#e5e7eb',
            },
          ],
          margin: [0, 0, 0, 20],
        },
        // Program Information
        {
          text: 'Program Information',
          style: 'sectionHeader',
        },
        {
          table: {
            widths: ['30%', '70%'],
            body: [
              [
                {text: 'Program:', style: 'label'},
                {text: program?.title || 'N/A', style: 'value'},
              ],
              [
                {text: 'Category:', style: 'label'},
                {text: program?.category || 'N/A', style: 'value'},
              ],
              [
                {text: 'Start Date:', style: 'label'},
                {text: formatDate(program?.startDate), style: 'value'},
              ],
              [
                {text: 'Location:', style: 'label'},
                {text: program?.location || 'N/A', style: 'value'},
              ],
            ],
          },
          layout: 'noBorders',
          margin: [0, 0, 0, 20],
        },
        // Applicant Information
        {
          text: 'Applicant Information',
          style: 'sectionHeader',
        },
        {
          table: {
            widths: ['30%', '70%'],
            body: [
              [
                {text: 'Full Name:', style: 'label'},
                {text: `${registration.firstName} ${registration.lastName}`, style: 'value'},
              ],
              [
                {text: 'Email:', style: 'label'},
                {text: registration.email || 'N/A', style: 'value'},
              ],
              [
                {text: 'Phone:', style: 'label'},
                {text: registration.phone || 'N/A', style: 'value'},
              ],
              [
                {text: 'Registered At:', style: 'label'},
                {text: formatDate(registration.registeredAt), style: 'value'},
              ],
              [
                {text: 'Status:', style: 'label'},
                {
                  text: (registration.status || 'pending').toUpperCase(),
                  style: 'value',
                  color: statusColors[registration.status || 'pending'] || '#000',
                  bold: true,
                },
              ],
            ],
          },
          layout: 'noBorders',
          margin: [0, 0, 0, 20],
        },
        // Responses
        {
          text: 'Application Responses',
          style: 'sectionHeader',
        },
        {
          text: 'Why do you want to join this program?',
          style: 'questionLabel',
        },
        {
          text: registration.reason || 'No response provided',
          style: 'answer',
          margin: [0, 0, 0, 15],
        },
        {
          text: 'Where did you hear about this program?',
          style: 'questionLabel',
        },
        {
          text: registration.hearAbout || 'No response provided',
          style: 'answer',
          margin: [0, 0, 0, 15],
        },
        {
          text: 'Most convenient time to join online:',
          style: 'questionLabel',
        },
        {
          text: registration.convenientTime || 'No response provided',
          style: 'answer',
          margin: [0, 0, 0, 15],
        },
        {
          text: 'Additional Information:',
          style: 'questionLabel',
        },
        {
          text: registration.additionalInfo || 'No additional information provided',
          style: 'answer',
          margin: [0, 0, 0, 20],
        },
        // Admin Notes (if any)
        ...(registration.adminNotes
          ? [
              {
                text: 'Admin Notes',
                style: 'sectionHeader',
              },
              {
                text: registration.adminNotes,
                style: 'answer',
                margin: [0, 0, 0, 20],
              },
            ]
          : []),
        // Footer
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 515,
              y2: 0,
              lineWidth: 1,
              lineColor: '#e5e7eb',
            },
          ],
          margin: [0, 20, 0, 10],
        },
        {
          text: `Generated on ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}`,
          style: 'footer',
          alignment: 'center',
        },
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          color: '#111827',
          margin: [0, 0, 0, 5],
        },
        subheader: {
          fontSize: 14,
          color: '#6b7280',
        },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          color: '#111827',
          margin: [0, 0, 0, 10],
          decoration: 'underline',
        },
        label: {
          fontSize: 10,
          color: '#6b7280',
          margin: [0, 3, 0, 3],
        },
        value: {
          fontSize: 11,
          color: '#111827',
          margin: [0, 3, 0, 3],
        },
        questionLabel: {
          fontSize: 10,
          bold: true,
          color: '#374151',
          margin: [0, 0, 0, 5],
        },
        answer: {
          fontSize: 11,
          color: '#111827',
          lineHeight: 1.4,
        },
        footer: {
          fontSize: 9,
          color: '#9ca3af',
        },
      },
      defaultStyle: {
        font: 'Roboto',
      },
    }

    // Generate and download PDF
    const fileName = `registration-${registration.firstName}-${registration.lastName}-${registration._id.slice(-6)}.pdf`
    pdfMake.createPdf(docDefinition).download(fileName)
  }

  return {
    label: 'Export PDF',
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
    onHandle: handleExport,
  }
}
